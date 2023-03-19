interface ICard {
  points: number,
  question: string,
  answer: string
}

interface ICardElement extends ICard {
  render: () => void
}

class Card {
  public points: number;
  public question: string;
  public answer: string;
  private _parentClass: string;
  constructor(points: number, question: string, answer: string, parentClass: string) {
    this.points = points;
    this.question = question;
    this.answer = answer;
    this._parentClass = parentClass;
  }
  
  render() {
    const parent: Element | null = document.querySelector(this._parentClass);
    if (parent) {
      const card = document.createElement('div');
      card.classList.add('quiz__card-item');
      card.innerHTML = `
        <div class="quiz__card quiz__card-front">
          <p class="quiz__card-front-text">Вопрос на:<br/><span class="quiz__card-front-value">${this.points}</span><br/>баллов</p>
        </div>
        <div class="quiz__card quiz__card-back">
          <div class="quiz__card-item-points">${this.points}</div>
          <div class="quiz__card-content">
            <div class="quiz__card-item-question">${this.question}</div>
            <form class="quiz__card-item-form">
              <input type="text" class="quiz__card-item-answer" placeholder="Ваш ответ">
            </form>
          </div>
        </div>
      `;
      card.addEventListener('click', () => showCard(card));
      const formEl: Element = card.querySelector('.quiz__card-item-form');
      const inputEl: HTMLInputElement = formEl.querySelector('.quiz__card-item-answer');
      formEl.addEventListener('submit', (e): void => checkAnswer(e, card, inputEl, this.answer, this.points));
      parent.append(card);
    }
  }
}

fetchQuiz("/db.json");

let totalScore: number = 0;
let questionsCount: number = 0;
let currentStep: number = 1;
const modal: Element = document.querySelector('.modal');
modal.querySelector('.modal__btn').addEventListener('click', () => location.reload());
const scoreEl: Element = document.querySelector('.quiz__score-value');
scoreEl.innerHTML = `${totalScore}`;

async function fetchQuiz(url: string): Promise<void> {
  try {
    const res: Response = await fetch(url);
    const data: ICard[] = await res.json();
    questionsCount = data.length;
    
    for (let item of data) {
      const card: ICardElement = new Card(item.points, item.question, item.answer, '.quiz__card-list');
      card.render();
    }
  } catch(err) {
    alert(err);
  }
}

function checkAnswer(e: Event, cardEl: HTMLElement, inputEl: HTMLInputElement, answer: string, points: number) {
  e.preventDefault();
  if (inputEl.value.toLowerCase() === answer.toLowerCase()) {
    alert('Правильно!');
    totalScore += points;
    scoreEl.innerHTML = `${totalScore}`;
  } else {
    alert('Неправильно!');
  }
  currentStep++;
  cardEl.style.transform = 'rotateY(0)';
  cardEl.classList.add('quiz__card-item_disabled');
  if (currentStep > questionsCount) {
    modal.classList.add('modal_active');
    console.log(1);
    (modal.querySelector('.modal__points') as HTMLElement).innerText = `${totalScore}`;
  }
}

function showCard(card: HTMLElement | null): void {
  const cardEls: NodeListOf<HTMLElement> = document.querySelectorAll('.quiz__card-item');
  cardEls.forEach(item => item.style.transform = 'rotateY(0deg)');
  card.style.transform = 'rotateY(180deg)';
}