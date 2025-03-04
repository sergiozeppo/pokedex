import CardList from '../../components/CardList/CardList';
import Modal from '../../components/Modal/Modal';
import styles from './Main.module.css';

function Main() {
  return (
    <main className={styles['main-container']}>
      <div className={styles['content-wrapper']}>
        <CardList />
        <Modal />
      </div>
    </main>
  );
}

export default Main;
