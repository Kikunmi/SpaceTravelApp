import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { LoadingContext } from '../context/LoadingContext';
import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import styles from './Construction.module.css';

const Construction = () => {
  const [form, setForm] = useState({ name: '', capacity: '', description: '', pictureUrl: '' });
  const [error, setError] = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.capacity || !form.description) {
      setError('Name, capacity, and description are required.');
      return;
    }
    setLoading(true);
    const res = await SpaceTravelApi.buildSpacecraft({
      name: form.name,
      capacity: parseInt(form.capacity, 10),
      description: form.description,
      pictureUrl: form.pictureUrl || undefined
    });
    setLoading(false);
    if (res.isError) setError('Failed to build spacecraft.');
    else navigate('/spacecrafts');
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.construction}>
      <Navigation />
      <h1>Build a New Spacecraft</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name*
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Capacity*
          <input name="capacity" type="number" value={form.capacity} onChange={handleChange} />
        </label>
        <label>
          Description*
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <label>
          Picture URL
          <input name="pictureUrl" value={form.pictureUrl} onChange={handleChange} />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Build</button>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
      </form>
    </div>
  );
};

export default Construction;
