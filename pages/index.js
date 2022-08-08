import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ pokemon }) {
  return (
    <Layout title="Pokedex Nextjs">
      <h1 className="text-4xl mb-8 text-center">Pokedex Nextjs</h1>
      <ul>
        {pokemon.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/pokeman?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <picture>
                  <img
                    className="w-20 h-20 mr-3"
                    layout="fill"
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                </picture>
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokemon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
  }
};
