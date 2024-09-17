'use server';
import { ContainerApi, ContainerSummary } from '@/services/docker-api';
import axios from 'axios';
import 'server-only';

const axiosInstance = axios.create({
  socketPath: '/var/run/docker.sock',
  baseURL: 'http://localhost',
});

// Add a request interceptor to replace the first segment of the URL path
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url) {
      const url = new URL(config.baseURL + config.url); // Create a dummy URL to parse the path
      const pathSegments = url.pathname.split('/');
      if (pathSegments.length > 1) {
        pathSegments[0] = 'v1.43'; // Replace 'new-segment' with your desired value
        url.pathname = pathSegments.join('/');
        config.url = url.pathname
          .replace(config.baseURL!, '')
          .concat(url.search); // Update the URL path in the config
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function listDockerContainer(): Promise<ContainerSummary[]> {
  try {
    const containerApi = new ContainerApi(undefined, undefined, axiosInstance);
    const res = await containerApi.containerList(true);
    return res.data.filter(
      (container) => !container.Names?.join(',').match('stash'),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
