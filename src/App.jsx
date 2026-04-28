import { useEffect, useState } from 'react';
import './App.css';
import { getItems } from './api';
import ItemForm from './itemForm.jsx';
import ItemList from './itemList.jsx';

function App() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const loadItems = async () => {
        try {
            setError('');
            const response = await getItems();
            setItems(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load items.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    return (
        <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
            <h1>Item Manager</h1>
            <p>Manage your items with the MERN backend.</p>
            {error && <p style={{ color: 'crimson' }}>{error}</p>}
            <ItemForm onItemAdded={loadItems} />
            {loading ? <p>Loading items...</p> : <ItemList items={items} onRefresh={loadItems} />}
        </main>
    );
}

export default App;
