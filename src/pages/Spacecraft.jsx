import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { LoadingContext } from '../context/LoadingContext';
import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import styles from './Spacecraft.module.css';

const Spacecraft = () => {
  const { id } = useParams();
  const [spacecraft, setSpacecraft] = useState(null);
  const [error, setError] = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    SpaceTravelApi.getSpacecraftById({ id })
      .then(res => {
        if (res.isError || !res.data) setError('Spacecraft not found');
        else setSpacecraft(res.data);
      })
      .catch(() => setError('Failed to fetch spacecraft'))
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  if (loading) return <Loading />;
  if (error) return (
    <div className={styles.spacecraft}>
      <Navigation />
      <div className={styles.error}>{error}</div>
    </div>
  );
  if (!spacecraft) return null;

  return (
    <div className={styles.spacecraft}>
      <Navigation />
      <h1>{spacecraft.name}</h1>
      <p><strong>Capacity:</strong> {spacecraft.capacity}</p>
      <p><strong>Description:</strong> {spacecraft.description}</p>
      {spacecraft.pictureUrl && <img src={spacecraft.pictureUrl} alt={spacecraft.name} className={styles.image} />}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Spacecraft;
