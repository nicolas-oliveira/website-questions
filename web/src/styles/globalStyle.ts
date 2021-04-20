import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --big: 3em;
    --bigger: 3.2em;
    --medium: 1.6em;
    --small: 1em;
    --smallest: 0.7em;
    --most-smallest: 0.4em;

    /* -- Cores primárias -- */
    --white: #FFFFFF;
    --ink: #170C3A;
    --blue: #365DF0;
    --gren: #12DB89;
    --red: #F95E5A;
    --yellow: #FFBB43;
    --purple: #6554C0;
    --teal: #30C3FC;

    /* -- Cores secundárias -- */

    /* Cores escuras */
    --dark-white: #FCFCFD;
    --darker-white: #F5F4F6;
    --darkerst-white: #EBEAED;
    --most-darkerst-white: #DEDCE1;

    --dark-blue: #2F55CC;
    --dark-green: #10B26C;
    --dark-red: #CC4C4C;
    --dark-yellow: #D89C3A;
    --dark-purple: #4C4499;
    --dark-teal: #2BAFD8;

    --darker-blue: #244AA8;
    --darker-green: #0E995D;
    --darker-red: #A53F3F;
    --darker-yellow: #996C2B;
    --darker-purple: #353372;
    --darker-teal: #2497B2;

    /* Cores claras */
    --light-ink: #8F8A9B;
    --lighter-ink: #B1ADB9;
    --lightest-ink: #C7C4CD;

    --light-blue: #9AAEF7;
    --light-green: #88EDC4;
    --light-red: #FCAEAC;
    --light-yellow: #FFDDA1;
    --light-purple: #B2A9DF;
    --light-teal: #98E1FE;

    --lighter-blue: #B9C6FA;
    --lighter-green: #B7F7D8;
    --lighter-red: #FCC6C5;
    --lighter-yellow: #FFF8EC;
    --lighter-purple: #EFEEF9;
    --lighter-teal: #EAF9FF;

    --lightest-blue: #CAD6FC;
    --lightest-green: #CFF9E6;
    --lightest-red: #FCD7D6;

    --most-lightest-blue: #E1E7FD;
    --most-lightest-green: #E7FBF3;
    --most-lightest-red: #FEEFEE;
  }

  *, html {
    margin: 0;
    bottom: 0;
    outline: 0;
    box-sizing: border-box;
  }
  
  body {
    display: flex;
    align-items: center;
    justify-content: column;
    flex-direction: column;

    height: 100%;
    width: 100%;
    
    line-height: 2em;
    font-family: 'Source Sans Pro', 'PT Mono', sans-serif, monospace;
    color: var(--ink);

    @media (min-width: 2560px) {font-size: 18px;}
    @media (max-width: 2560px) {font-size: 18px;}
    @media (max-width: 1024px) {font-size: 16px;}
    @media (max-width: 768px) {font-size: 14px;}
    @media (max-width: 425px) {font-size: 12px;}
    @media (max-width: 375px) {font-size: 10px;}
    @media (max-width: 320px) {font-size: 8px;}
  }
`;
