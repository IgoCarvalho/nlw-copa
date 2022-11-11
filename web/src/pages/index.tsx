import Image from 'next/image';

import appPreviewImg from '../assets/nlw-copa-app-preview.png';
import logoImg from '../assets/nlw-copa-logo.svg';
import avatarDiegoImg from '../assets/avatar-diego.png';
import avatarRodrigoImg from '../assets/avatar-rodrigo.png';
import avatarMaykImg from '../assets/avatar-mayk.png';
import avatarJakeImg from '../assets/avatar-jake.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('pools', {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert(
        'Bolão criado com sucesso, o código foi copiado para área de transferência!'
      );

      setPoolTitle('');
    } catch (error) {
      console.error(error);
      alert('Falha ao criar o bolão, tente novamente!');
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <div className="flex">
            <Image
              className="rounded-full ring-4 ring-gray-900"
              src={avatarDiegoImg}
              alt="Avatar Diego"
            />
            <Image
              className="-ml-4 rounded-full ring-4 ring-gray-900"
              src={avatarRodrigoImg}
              alt="Avatar Rodrigo"
            />
            <Image
              className="-ml-4 rounded-full ring-4 ring-gray-900"
              src={avatarMaykImg}
              alt="Avatar Mayk"
            />
            <Image
              className="-ml-4 rounded-full ring-4 ring-gray-900"
              src={avatarJakeImg}
              alt="Avatar Jake"
            />
          </div>

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
            já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            type="text"
            placeholder="Qual nome do seu bolão?"
            className="flex-1 text-sm bg-gray-800 text-gray-100 border border-gray-600 rounded px-6 py-4"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-sm font-bold uppercase text-gray-900 hover:bg-yellow-600"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que <br />
          poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 divide-x divide-gray-600 grid grid-cols-2 text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl leading-tight">
                +{props.poolCount}
              </span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl leading-tight">
                +{props.guessCount}
              </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api('pools/count'),
      api('guesses/count'),
      api('users/count'),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
