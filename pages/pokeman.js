import Link from "next/link";
import Layout from "../components/Layout";

const pokeman = ({ name, weight, height, types, image }) => {
  return (
    <Layout title={name}>
      <h1 className="text-center capitalize text-4xl mb-2">{name}</h1>
      <picture>
        <img className="mx-auto " src={image} alt={name} />
      </picture>
      <p>
        <span className="font-bold mr-2 ">Weight : </span>
        {weight}
      </p>
      <p>
        <span className="font-bold mr-2 ">Height : </span>
        {height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default pokeman;

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ("00" + id).slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    const { name, weight, height, types, image } = pokeman;
    return {
      props: { name, weight, height, types, image },
    };
  } catch (err) {
    console.error(err);
  }
}
