import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = React.useContext(GithubContext)

  // console.log(repos)

  // ========== this were returning the languages % ========= //

  // let languages = repos.reduce((total, item)=>{
  //   const { language } = item;
  //   if(!language) return total;
  //   if (!total[language]) {
  //     total[language] = { label:language, value:1 };
  //   } else {
  //     total[language] = {
  //       ...total[language], 
  //       value: total[language].value + 1,
  //     };      
  //   }
  //   return total;
  // },{});

  //sort the items
  // languages = Object.values(languages).sort((a,b)=>{
  //   return b.value - a.value;
  // }).slice(0, 5);

  const languages = repos.reduce((total, item)=>{
    const { language, stargazers_count } = item;
    if(!language) return total;
    if (!total[language]) {
      total[language] = { label:language, value:1, stars:stargazers_count };
    } else {
      total[language] = {
        ...total[language], 
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };      
    }
    return total;
  },{});


  //sort the items
  const mostUsed = Object.values( languages ).sort(( a, b ) => {
    return b.value - a.value;
  }).slice(0, 5);

  //most popular language and sorted baed on stars

  const mostPopular = Object.values(languages).sort((a,b) => {
    return b.stars - a.stars;
  }).map((item)=>{
    return {...item, value:item.stars}
  }).slice(0,5);


  const chartData = [
    {
      label: 'HTML',
      value: "17"
    },
    {
      label: "CSS",
      value: "23"
    },
    {
      label: "Javascript",
      value: "61"
    },
  ];

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={chartData} />  {/* <ExampleChart data={chartData} /> */}
        {/* <div></div> */}
        <Doughnut2D data={mostPopular} />
        <div></div>
        {/* <Column3D data={chartData} /> */}
        {/* <Bar3D data={chartData} /> */}
        {/* <div></div> */}
        {/* <ExampleChart data={chartData} /> */}
        <div></div>
      </Wrapper>
    </section>
  )
}; 
 
const Wrapper = styled.div` 
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
