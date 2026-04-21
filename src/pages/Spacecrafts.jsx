import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { LoadingContext } from '../context/LoadingContext';
import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import styles from './Spacecrafts.module.css';

const Spacecrafts = () => {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [error, setError] = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    SpaceTravelApi.getSpacecrafts()
      .then(res => {
        if (res.isError) setError('Failed to fetch spacecrafts');
        else setSpacecrafts(res.data);
      })
      .catch(() => setError('Failed to fetch spacecrafts'))
      .finally(() => setLoading(false));
  }, [setLoading]);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    await SpaceTravelApi.destroySpacecraftById({ id });
    // Refresh list
    const res = await SpaceTravelApi.getSpacecrafts();
    if (res.isError) setError('Failed to fetch spacecrafts');
    else setSpacecrafts(res.data);
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.spacecrafts}>
      <Navigation />
      <h1>Spacecrafts</h1>
      <button onClick={() => navigate('/spacecrafts/new')}>Build New Spacecraft</button>
      {error && <div className={styles.error}>{error}</div>}
      <ul className={styles.list}>
        {spacecrafts.length === 0 && <li>No spacecrafts found.</li>}
        {spacecrafts.map(sc => (
          <li key={sc.id} className={styles.card}>
            <h2>{sc.name}</h2>
            <p>Capacity: {sc.capacity}</p>
            <p>{sc.description}</p>
            <button onClick={() => navigate(`/spacecrafts/${sc.id}`)}>View Details</button>
            <button onClick={() => handleDelete(sc.id)}>Destroy</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spacecrafts;
