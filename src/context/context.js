import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import { async } from 'q';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//provider, consumer - GithubContext.Provider

const GithubProvider = ({children}) => {

    const [ githubUser, setGithubUser ] = useState(mockUser);
    const [ repos, setRepos ] = useState(mockRepos);
    const [ followers, setFollowers ] = useState(mockFollowers);

    //request loading
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    //errors
    const [error, setError] = useState({show: false, msg:''})
    //search github user
    const searchGithubUser = async (user) => {
        toggleError();  // to remove the error msg once new search load
        // console.log(user);
        setIsLoading(true);
        const response = await axios(`${rootUrl}/users/${user}`).
        catch (err => 
            console.log(err)
        );
        
        if(response){
            setGithubUser(response.data);
            //more logic here
            //binding the searched user to the main repos
            const {login, followers_url} = response.data;

            //repos
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => 
                setRepos(response.data)
            );
            //followers
            axios(`${followers_url}?per_page=100`).then((response) => 
                setFollowers(response.data)
            );

            //we need all the data to show up at the same time
            //that's why we are going to add await on every axios and set promise          

            // await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`) ])

            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`), 
                axios(`${followers_url}?per_page=100`) 
            ]).then((results)=>{
                // console.log(results);
                const [repos, followers] = results;
                const status = 'fulfilled';
                if(repos.status === status){
                    setRepos(repos.value.data);
                }
                if(followers.status === status){
                    setFollowers(followers.value.data);
                }
            }).catch(err => console.log(err));

        }
        else{
            toggleError(true, 'There is no user with that username');
        }
        checkRequests();
        setIsLoading(false)
    };
    // check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({ data })=>{ 
                let { rate: { remaining }} = data;
                // remaining = 0;
                setRequests(remaining);
                if(remaining === 0) {
                    // throw an error 
                    toggleError(true, 'Sorry you have exceded your hourly rate limit!');
                }
            })            
            .catch((err)=>console.log(err));
    };
    //error
    function toggleError(show = false, msg =''){
        setError({show,msg})
    }
    //error
    useEffect(checkRequests, []);

    return (
        <GithubContext.Provider value={{ githubUser, repos, followers, requests, error, searchGithubUser, isLoading }}>{children}</GithubContext.Provider>
    );
};

export{ GithubProvider, GithubContext };