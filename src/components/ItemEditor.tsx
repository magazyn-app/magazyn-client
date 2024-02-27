import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const ItemEditor: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [type, setType] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value));
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newItem = {
        name,
        price,
        type,
      };

      const itemsArray = [newItem]; // Create an array with a single item object
      console.log(itemsArray);

      await axios.post('http://localhost:8080/items', itemsArray);
      setSuccess(true);
      setName('');
      setPrice('');
      setType('');
      setError(null);
    } catch (error) {
      setError('Error submitting item');
      setSuccess(false);
    }
  };

  return (
    <div>
      <Typography variant="h5">Add New Item</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="number"
          label="Price"
          value={price}
          onChange={handlePriceChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={handleTypeChange}
            label="Type"
          >
            <MenuItem value="ART">Art</MenuItem>
            <MenuItem value="CLOTHES">Clothes</MenuItem>
            <MenuItem value="ELECTRONICS">Electronics</MenuItem>
            <MenuItem value="FOOD">Food</MenuItem>
            <MenuItem value="MUSIC">Music</MenuItem>
            <MenuItem value="SPORT">Sport</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">Item added successfully</Typography>}
    </div>
  );
};

export default ItemEditor;