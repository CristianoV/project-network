import styles from './styles.module.scss';
import pipe from '../../../public/Imagens/Mario/pipe.png';
import mario from '../../../public/Imagens/Mario/mario.gif';
import over from '../../../public/Imagens/Mario/game-over.png';
import cloud from '../../../public/Imagens/Mario/clouds.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function MarioGame() {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    const mario = document.getElementById('mario');
    const pipe = document.getElementById('pipe');

    const jump = () => {
      if (mario) {
        mario.classList.add(styles.jump);
        setTimeout(() => {
          mario.classList.remove(styles.jump);
        }, 500);
      }
    };

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        jump();
      }
    });

    const instructions = document.getElementById('instructions');

    const removeInstructions = () => {
      if (instructions) {
        instructions.style.display = 'none';
      }
    };

    setTimeout(() => {
      removeInstructions();
    }, 2000);

    const checkDead = setInterval(() => {
      if (mario && pipe) {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window
          .getComputedStyle(mario)
          .bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition >= 0 && marioPosition < 80) {
          pipe.style.animation = 'none';
          pipe.style.left = `${pipePosition}px`;

          mario.style.animation = 'none';
          mario.style.bottom = `${marioPosition}px`;

          setDead(true);

          mario.classList.add(styles.dead);
          mario.classList.remove(styles.mario);

          clearInterval(checkDead);
          clearInterval(timerInterval);
          clearInterval(scoreInterval);
        }
      }
    }, 10);

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    const scoreInterval = setInterval(() => {
      setScore((prevScore) => prevScore + 1);
    }, 2000);

    return () => {
      clearInterval(checkDead);
      clearInterval(timerInterval);
      clearInterval(scoreInterval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.gameContainer}>
        <div className={styles.score}>
          <span>Score: </span>
          {score}
        </div>
        <div className={styles.timer}>
          <span>Timer: </span>
          {timer}
        </div>
        <div className={styles.instructions} id='instructions'>
          <span>Aperte espaço para pular</span>
        </div>
        {dead && (
          <div className={styles.gameOver}>
            <div className={styles.gameOver_text}>
              <span>Game Over</span>
            </div>
            <div className={styles.score_gameOver}>
              <span>Score: {score}</span>
              <span>Timer: {timer}</span>
            </div>
            <div className={styles.restart}>
              <button onClick={() => window.location.reload()}>Restart</button>
            </div>
          </div>
        )}
        <Image src={cloud} alt='cloud' className={styles.cloud} />
        <Image src={pipe} alt='pipe' className={styles.pipe} id='pipe' />
        <Image
          src={dead ? over : mario}
          alt='mario'
          className={styles.mario}
          id='mario'
          priority
        />
      </div>
    </div>
  );
}
