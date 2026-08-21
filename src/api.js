const API_URL = "https://www.thesportsdb.com/api/v1/json/123";

export async function buscarLigas() {
    const response = await fetch(`${API_URL}/all_leagues.php`);

    if (!response.ok) {
        throw new Error("Erro ao buscar ligas");
    }

    const data = await response.json();

    return data.leagues;
}

export async function buscarTimesPorLiga(nomeLiga) {
    const response = await fetch(
        `${API_URL}/search_all_teams.php?l=${encodeURIComponent(nomeLiga)}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar times");
    }

    const data = await response.json();

    return data.teams;
}

export async function buscarJogadoresPorTime(idTime) {
    const response = await fetch(
        `${API_URL}/lookup_all_players.php?id=${idTime}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar jogadores");
    }

    const data = await response.json();

    return data.player;
}