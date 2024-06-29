import { useState, useEffect } from 'react'
import style from './App.module.css'
import { Item } from './types/Item';
import { BASE_API_URL } from './utils/constants';
import Loader from './components/Loader/Loader';
import ItemNews from './components/ItemNews/ItemNews';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'best' | 'new' | 'top'>('best');
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true)
    const fetchItems = async (page: number, sort: 'best' | 'new' | 'top') => {
      const response = await fetch(
        `${BASE_API_URL}${sort}stories.json`
      );
      const itemIds = await response.json();
      const itemPromises = itemIds
        .slice((page - 1) * 15, page * 15)
        .map((id: number) =>
          fetch(`${BASE_API_URL}item/${id}.json`).then(
            (res) => res.json()
          )
        );
      const items = await Promise.all(itemPromises)
      setIsLoading(false)
      setItems(items)
      setTotalPages(Math.ceil(itemIds.length / 15))
    };

    fetchItems(currentPage, sortBy);
  }, [currentPage, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSortChange = (sort: 'best' | 'new' | 'top') => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  return (
    <>
      <h1 className={style.headerContainer}>Hacker News</h1>
      <nav className={style.navContainer}>
        <button onClick={() => handleSortChange('best')}>Best</button>
        <button onClick={() => handleSortChange('new')}>New</button>
        <button onClick={() => handleSortChange('top')}>Top</button>
      </nav>
      <main className={style.mainContainer}>
        {
          isLoading ? ( 
            <Loader/>
          ) : (
            <div>
              {items.map((item) => (
                <ItemNews 
                  key={item.id} id={0} 
                  by={item.by} 
                  score={item.score} 
                  time={item.time} 
                  title={item.title} 
                  type={item.type} 
                  url={item.url}/>
              ))}
            </div>
          )
        }
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default App
