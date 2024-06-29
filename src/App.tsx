import { useState, useEffect } from 'react'
import './App.css'
import { Item } from './types/Item';
import { BASE_API_URL } from './utils/constants';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'best' | 'new' | 'top'>('best');
  const [isLoading, setIsLoading] = useState(false)

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
      const items = await Promise.all(itemPromises);
      setIsLoading(false)
      setItems(items);
    };

    fetchItems(currentPage, sortBy);
  }, [currentPage, sortBy]);

  const handleSortChange = (sort: 'best' | 'new' | 'top') => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <>
      <h1>Hacker News</h1>
      <nav>
        <button onClick={() => handleSortChange('best')}>Best</button>
        <button onClick={() => handleSortChange('new')}>New</button>
        <button onClick={() => handleSortChange('top')}>Top</button>
      </nav>
      {
        isLoading ? ( 
          "Loader..."
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <a href={item.url}>{item.title}</a>
                <p>
                  Author: {item.by} | Score: {item.score} | Time: {new Date(
                    item.time * 1000
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )
      }
    </>
  )
}

export default App
