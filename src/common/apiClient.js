import wretch from 'wretch';

import { ACCESS_TOKEN_KEY, API_BASE_URL } from './constants';

class ApiClient {
    #httpClient;

    /**
     * @param {string} apiBaseUrl
     */
    constructor(apiBaseUrl = API_BASE_URL) {
        this.#httpClient = wretch(apiBaseUrl).errorType('json');
    }

    get #accessToken() {
        return window.localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    async register({ name, email, password }) {
        return this.#httpClient
            .post(
                {
                    name,
                    email,
                    password,
                },
                '/register'
            )
            .json();
    }

    async login(email, password) {
        return this.#httpClient
            .post(
                {
                    email,
                    password,
                },
                '/login'
            )
            .json();
    }

    async getLoggedInUser() {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).get('/users/me').json();
    }

    async getActiveNotes() {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).get('/notes').json();
    }

    async getArchivedNotes() {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).get('/notes/archived').json();
    }

    async getNote(id) {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).get(`/notes/${id}`).json();
    }

    async addNote({ title, body }) {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).post({ title, body }, '/notes').json();
    }

    async archiveNote(id) {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).post(undefined, `/notes/${id}/archive`).json();
    }

    async unArchiveNote(id) {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).post(undefined, `/notes/${id}/unarchive`).json();
    }

    async deleteNote(id) {
        return this.#httpClient.auth(`Bearer ${this.#accessToken}`).delete(`/notes/${id}`).json();
    }
}

const apiClient = new ApiClient();

export default apiClient;
