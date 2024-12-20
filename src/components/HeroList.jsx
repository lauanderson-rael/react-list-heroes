import { useEffect, useState } from "react";
import './styles.css';
import axios from "axios";
import { FaSearch } from "react-icons/fa";

function HeroList() {
  const [heroes, setHeroes] = useState([]);
  const [searchHero, setSearchHero] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState("");


  useEffect(() => {
    axios.get("https://homologacao3.azapfy.com.br/api/ps/metahumans")
      .then(response => {
        setHeroes(response.data);
        setFilteredHeroes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar os heróis:", error);
      });
  }, []);

  const handleSearch = () => {
    const results = heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchHero.toLowerCase())
    );
    setFilteredHeroes(results);
    setNoResults(results.length === 0);
  };

  const handleSelectHero = (hero) => {
    if (selectedHeroes.includes(hero)) {
      setSelectedHeroes(selectedHeroes.filter(r => r !== hero));
    } else if (selectedHeroes.length < 2) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const qtdSelect = () => {
    if (selectedHeroes.length === 2) {
      const [hero1, hero2] = selectedHeroes;
      const winner = compareHeroes(hero1, hero2);
      setWinner(winner);
      setShowModal(true);
    } else {
      alert("Selecione pelomenos 2 heróis para a batalha!");
    }
  };

  const compareHeroes = (hero1, hero2) => {
    const stats1 = hero1.powerstats;
    const stats2 = hero2.powerstats;
    const score1 = stats1.intelligence + stats1.strength + stats1.speed + stats1.durability + stats1.power + stats1.combat;
    const score2 = stats2.intelligence + stats2.strength + stats2.speed + stats2.durability + stats2.power + stats2.combat;

    if (score1 > score2) {
      return hero1.name;
    } else if (score2 > score1) {
      return hero2.name;
    } else {
      return "Empate";
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Lista de Herois</h1>
        <div>
          <input
            type="text"
            value={searchHero}
            onChange={(e) => setSearchHero(e.target.value)}
            placeholder="Buscar Herói"
          />
          <button onClick={handleSearch} className="btn lupa"><FaSearch/></button>
          <button onClick={qtdSelect} className="btn">Batalha</button>
          <div className="message">Selecione 2 herois e clique em <span>Batalha</span></div>
        </div>
      </header>

      {noResults ? (
        <p>Nenhum herói encontrado.</p>
      ) : (
        
        <ul className="container-list">
          {heroes < 1 && (
            <h2 className="loading">Carregando</h2>
          )}

          {filteredHeroes.map(hero => (
            <li
              key={hero.id}
              className={`card ${selectedHeroes.includes(hero) ? 'selected' : ''}`}
              onClick={() => handleSelectHero(hero)}
            >
              <strong>{hero.name}</strong>
              <img src={hero.images.sm} alt={hero.name} style={{ height: "100%", borderRadius: "10px" }} />
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <strong style={{ color: "red" }}>Batalha</strong>
            <strong style={{ color: "rgb(13, 255, 0)" }}>Vencedor: {winner}</strong>

            <div className="container-batalha">
              {selectedHeroes.map(hero => (
                <div key={hero.id} className="details">
                  <strong>{hero.name}</strong>
                  <img src={hero.images.sm} alt={hero.name} style={{ borderRadius: "10px" }} />
                  <div className="powers">
                    <div>Inteligência: {hero.powerstats.intelligence}</div>
                    <div>Força: {hero.powerstats.strength}</div>
                    <div>Velocidade: {hero.powerstats.speed}</div>
                    <div>Durabilidade: {hero.powerstats.durability}</div>
                    <div>Poder: {hero.powerstats.power}</div>
                    <div>Combate: {hero.powerstats.combat}</div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroList;
