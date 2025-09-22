import axios from 'axios'

const portApi = axios.create({
    baseURL: 'https://portfolio-backend-jv44.onrender.com/contenido/api/v1'
})

export const getAllProject = () => portApi.get('/project');
export const getAllDescrip = () => portApi.get('/description');
export const getAllSkill = () => portApi.get('/skill');