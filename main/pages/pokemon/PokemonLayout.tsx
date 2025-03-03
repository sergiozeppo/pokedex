import { ReactNode } from 'react';
import Modal from '../../src/components/Modal/Modal';
import CardList from '../../src/components/CardList/CardList';
import styles from '../../src/views/Main/Main.module.css';

export default function PokemonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className={styles['main-container']}>
        <div className={styles['content-wrapper']}>
          <CardList />
          {children}
          <Modal />
        </div>
      </main>
    </>
  );
}
