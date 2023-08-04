import React, {useState} from 'react'

const ProductItem = ({product, onIncrement, onDecrement}) => {
  const [purchasedCount, setPurchasedCount] = useState(0)

  const handleIncrement = () => {
    setPurchasedCount((prevCount) => prevCount + 1)
    onIncrement(product.id)
  }

  const handleDecrement = () => {
    if (purchasedCount > 0) {
      setPurchasedCount((prevCount) => prevCount - 1)
      onDecrement(product.id)
    }
  }

  return (
    <div className='wrapProdOrder'>
      <h3>{product.name}</h3>
      <p>Нархи: {product.price}</p>
      <p>Мавжуд миқдор: {product.qty}</p>
      <p>Сони: {purchasedCount}</p>
      <div className='wrpaBtn'>
        <button className='increment' onClick={handleIncrement}>
          +
        </button>
        <button className='decrement' onClick={handleDecrement}>
          -
        </button>
      </div>
    </div>
  )
}

export default ProductItem
