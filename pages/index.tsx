import Head from 'next/head';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/App'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Video Preview Demo</title>
        <link rel='icon' href='
@https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739378446131x671454155771771300/Vector.svg?_gl=1*1vt2bqt*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTM2ODU5NS4yMC4xLjE3MzkzNzg0MTkuNjAuMC4w' />
      </Head>

      <App />
    </div>
  );
}
