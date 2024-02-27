import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import ItemEditor from './ItemEditor';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/items/all');
        setItems(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Items List</Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.itemId}>
            <ListItemText primary={item.name} secondary={`Price: $${item.price}`} />
          </ListItem>
        ))}
      </List>

      <ItemEditor/>
    </div>
  );
};

export default ItemList;