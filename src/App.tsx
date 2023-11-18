import { useState, useCallback, MouseEvent } from 'react'


import './app.styl'


// TODO: => utils.js
const toggleClass = (is: Boolean = true, className: string = 'is-active') =>
  is ? className : ''
const addLoremPic = (_, i) => ({ src: `https://picsum.photos/id/4${i}/300/300` })

const content = {
  title: 'Grid Animation - Challenge',
  subtitle: 'What you Ilked the most In Montreal?',
  description: "Montreal is the largest city in Canada's Quebec province.It's set on an island in the Saint Lawrence River and named after Mt. Royal, the triple- peaked hill at its heart.",
  images: [...Array.from({ length: 6 }, addLoremPic) ]
}


// TODO: Make sizing dynamic
const [col1, row1] = [0   ,  0]
const [col2, row2] = [13.5, 10]
const [col3, row3] = [27  , 20]

const lt = { x: col1, y: row1 }
const ct = { x: col2, y: row1 }
const rt = { x: col3, y: row1 }
const lc = { x: col1, y: row2 }
const cc = { x: col2, y: row2 }
const rc = { x: col3, y: row2 }
const lb = { x: col1, y: row3 }
const cb = { x: col2, y: row3 }
const rb = { x: col3, y: row3 }

const moves = {
  0: [lt, rt, rc, lb, cb, rb],
  1: [lt, ct, rb, lc, lb, cb],
  2: [lt, rt, cc, lb, lc, ct],
  3: [lt, rb, rc, lc, rt, ct],
  4: [lc, rt, lt, lb, cc, ct],
  5: [rb, lt, ct, rt, rc, lc]
}

interface AnimatedCardsProps {
  handleSelection: (e: MouseEvent) => void
  selectedCard: number
  images: {
    src: string 
    isActive: boolean
  }[]
}

const AnimatedCards = (({ images, selectedCard, handleSelection, handleMoveToTop }: AnimatedCardsProps) => 
  <section className='cards'>
    {images.map(({ src, isActive }, i) => {
      console.log(i, new Date().getMilliseconds());
      
      const { x, y } = moves[selectedCard as keyof typeof moves][i]
      return (
        <article
          key={ `img_${ i }` }
          className={`${toggleClass(isActive)} card`}
          style={{ 
            transform: `translate(${ x }em, ${ y }em) ${ isActive ? 'scale(2)' : '' }`, 
          }}
          onClick={ handleSelection }
        >
          <div className="overlay" id={`${i}`}>
            <b>{ i }</b>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ad enim optio quos.</p> */}
            {/* <button onClick={handleMoveToTop}>Move to Top</button> */}
          </div>
          <img src={ src } />
        </article>
      )
    })}
  </section>
)

function App() {
  const [selectedCard, setSelectedCard] = useState<number>(0)
  const { title, subtitle, description, images } = content

  const sortedImages = images.map((e, i) =>
    ({ ...e, isActive: i === selectedCard })
  )
    

  type idType = MouseEvent<HTMLDivElement, MouseEvent> & { target: { id: number } }
  const handleSelection = useCallback(({ target: { id } }: idType) => {
    setSelectedCard(+id)
  }, [])
  const handleMoveToTop = useCallback(({ target: { id } }: idType) => {}, [])


  return (
    <main className="main">
      <section className="text">
        <h1>{ title }</h1>
        <h2>{ subtitle }</h2>
        <p>{ description }</p>
        <div className="btn"></div>
        <button>Alphabetical Order</button>        
      </section>
      <AnimatedCards 
        images={sortedImages}
        selectedCard={selectedCard}
        handleSelection={handleSelection}
        handleMoveToTop={handleMoveToTop}
      />
      {/* TODO: Add button handle fn for alphabetical order */}
      {/* TODO: divide the elements in components (Card, Grid, Button) */}
    </main>
  )
}

export default App
