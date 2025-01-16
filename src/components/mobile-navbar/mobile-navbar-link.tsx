import { Link, useTransitionRouter } from 'next-view-transitions'
import { StylizedText } from '../stylized-text/stylized-text'
import React from 'react'

export function MobileNavbarLink({
  index,
  href,
  text,
  closeModal,
}: {
  index: number
  href: string
  text: string
  closeModal: () => void
}) {
  const router = useTransitionRouter()
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(href)
    console.log(closeModal)
    closeModal()
  }

  return (
    <li
      className="animate-fadeFromRight duration-200"
      style={{
        animationFillMode: 'backwards',
        animationDelay: `${index * 50 + 200}ms`,
      }}
    >
      <Link href={href} onClick={handleClick}>
        <StylizedText
          propsForElement={{
            id: 'item',
          }}
          offSetBottom="-2px"
          offSetRight="-3px"
          as="span"
          text={text}
          size="2rem"
          lineHeight={'2rem'}
        ></StylizedText>
      </Link>
    </li>
  )
}
