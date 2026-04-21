import React, { useEffect, useState, useContext } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { LoadingContext } from '../context/LoadingContext';
import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import styles from './Planets.module.css';

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [selectedSpacecraft, setSelectedSpacecraft] = useState(null);
  const [targetPlanet, setTargetPlanet] = useState(null);
  const [error, setError] = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      SpaceTravelApi.getPlanets(),
      SpaceTravelApi.getSpacecrafts()
    ]).then(([planetsRes, spacecraftsRes]) => {
      if (planetsRes.isError || spacecraftsRes.isError) {
        setError('Failed to fetch data');
      } else {
        setPlanets(planetsRes.data);
        setSpacecrafts(spacecraftsRes.data);
      }
    }).catch(() => setError('Failed to fetch data'))
      .finally(() => setLoading(false));
  }, [setLoading]);

  const handleSend = async () => {
    if (!selectedSpacecraft || !targetPlanet) return;
    setError(null);
    setLoading(true);
    const res = await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId: selectedSpacecraft.id,
      targetPlanetId: parseInt(targetPlanet, 10)
    });
    setLoading(false);
    if (res.isError) setError(res.data?.message || 'Failed to send spacecraft.');
    else window.location.reload(); // reload to update populations and locations
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.planets}>
      <Navigation />
      <h1>Planets</h1>
      {error && <div className={styles.error}>{error}</div>}
      <ul className={styles.planetList}>
        {planets.map(planet => (
          <li key={planet.id} className={styles.planetCard}>
            <h2>{planet.name}</h2>
            {planet.pictureUrl && <img src={planet.pictureUrl} alt={planet.name} className={styles.planetImg} />}
            <p>Population: {planet.currentPopulation}</p>
            <h3>Spacecraft stationed here:</h3>
            <ul>
              {spacecrafts.filter(sc => sc.currentLocation === planet.id).length === 0 && <li>None</li>}
              {spacecrafts.filter(sc => sc.currentLocation === planet.id).map(sc => (
                <li key={sc.id}>
                  {sc.name} (Capacity: {sc.capacity})
                  <button onClick={() => setSelectedSpacecraft(sc)}>Send</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {selectedSpacecraft && (
        <div className={styles.sendDialog}>
          <h2>Send {selectedSpacecraft.name}</h2>
          <label>
            Select destination planet:
            <select value={targetPlanet || ''} onChange={e => setTargetPlanet(e.target.value)}>
              <option value='' disabled>Select planet</option>
              {planets.filter(p => p.id !== selectedSpacecraft.currentLocation).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <button onClick={handleSend}>Send</button>
          <button onClick={() => { setSelectedSpacecraft(null); setTargetPlanet(null); }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Planets;
