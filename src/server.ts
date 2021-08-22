// import config from 'config';
// import app from './app';

import GitService from "./features/git/git.service"

GitService.republish({
    gitRepos: "",
    developBranch: "",
    masterBranch: ""
})

// const serverConfig: any = config.get('server');

// app.listen(process.env.PORT || serverConfig.port, () => {
//   console.info(`Listening on port ${process.env.PORT || serverConfig.port}`);
// });
