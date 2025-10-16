# phonebook-backend and phonebook-frontend

## Deployment

The backend was deployed to [Railway](https://railway.com/). All deployment configurations are managed directly through Railway’s web interface - no additional setup is required within this repository.

The pnpm workspace file and package.json in this directory is to workaround the limitations of Railpack where the detection doesn't work if the lockfile is not in the root of the "repository". The root can't be "phonebook-backend" because we would lose access to the "phonebook-frontend".
