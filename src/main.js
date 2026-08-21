import "./style.css";
import { buscarLigas, buscarTimesPorLiga, buscarJogadoresPorTime } from "./api.js";

const leaguesContainer = document.querySelector("#leagues-container");
const teamsContainer = document.querySelector("#teams-container");
const teamsTitle = document.querySelector("#teams-title");
const leaguesSection = document.querySelector("#leagues-section");
const teamsSection = document.querySelector("#teams-section");
const playersSection = document.querySelector("#players-section");
const playersContainer = document.querySelector("#players-container");
const playersTitle = document.querySelector("#players-title");
const backButton = document.querySelector("#back-button");
const backToLeaguesButton = document.querySelector("#back-to-leagues-button");

function mostrarLigas(ligas) {
    leaguesContainer.innerHTML = "";

    ligas.forEach((liga) => {
        const card = document.createElement("div");

        card.classList.add("league-card");

        card.innerHTML = `
            <h3>${liga.strLeague}</h3>
            <p>${liga.strSport}</p>
            <button>Ver times</button>
        `;

        const button = card.querySelector("button");

        button.addEventListener("click", async () => {
            try {
                const times = await buscarTimesPorLiga(liga.strLeague);

                mostrarTimes(times, liga.strLeague);

                leaguesSection.style.display = "none";
                teamsSection.style.display = "block";
            } catch (error) {
                console.error("Erro ao carregar times:", error);
            }
        });

        leaguesContainer.appendChild(card);
    });
}

function mostrarTimes(times, nomeLiga) {
    teamsTitle.textContent = `Times - ${nomeLiga}`;

    teamsContainer.innerHTML = "";

    times.forEach((time) => {
        console.log(time.strTeam, time.strTeamBadge);

        const card = document.createElement("div");

        card.classList.add("team-card");

        card.innerHTML = `
            <img src="${time.strBadge}" alt="Escudo do ${time.strTeam}">
            <h3>${time.strTeam}</h3>
            <p>${time.strCountry}</p>
        `;

        card.addEventListener("click", async () => {
          try {
              const jogadores = await buscarJogadoresPorTime(time.idTeam);

              mostrarJogadores(jogadores, time.strTeam);

              leaguesSection.style.display = "none";
              teamsSection.style.display = "none";
              playersSection.style.display = "block";
          } catch (error) {
              console.error("Erro ao carregar jogadores:", error);
          }
        });

        teamsContainer.appendChild(card);
    });
}

async function iniciar() {
    try {
        const ligas = await buscarLigas();

        mostrarLigas(ligas);
    } catch (error) {
        console.error("Erro ao carregar ligas:", error);

        leaguesContainer.innerHTML = `
            <p>Não foi possível carregar as ligas.</p>
        `;
    }
}

function mostrarJogadores(jogadores, nomeTime) {
    playersTitle.textContent = `Jogadores - ${nomeTime}`;

    playersContainer.innerHTML = "";

    if (!jogadores || jogadores.length === 0) {
        playersContainer.innerHTML = "<p>Nenhum jogador encontrado.</p>";
        return;
    }

    jogadores.forEach((jogador) => {
        const card = document.createElement("div");

        card.classList.add("player-card");

        card.innerHTML = `
            <h3>${jogador.strPlayer}</h3>
            <p>Posição: ${jogador.strPosition || "Não informado"}</p>
            <p>Nacionalidade: ${jogador.strNationality || "Não informado"}</p>
        `;

        playersContainer.appendChild(card);
    });
}

backButton.addEventListener("click", () => {
    playersSection.style.display = "none";
    teamsSection.style.display = "block";
});

backToLeaguesButton.addEventListener("click", () => {
    teamsSection.style.display = "none";
    leaguesSection.style.display = "block";
});

iniciar();