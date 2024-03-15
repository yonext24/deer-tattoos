import Link from 'next/link'
import { StylizedText } from '../stylized-text/stylized-text'

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
  return (
    <li
      className="animate-fadeFromRight duration-200"
      style={{
        animationFillMode: 'backwards',
        animationDelay: `${index * 50 + 200}ms`,
      }}
    >
      <Link href={href} onClick={closeModal}>
        <StylizedText
          propsForElement={{
            id: 'item',
          }}
          offSetBottom='-2px'
          offSetRight='-3px'
          as="span"
          text={text}
          size="2rem"
          lineHeight={'2rem'}
        ></StylizedText>
      </Link>
    </li>
  )
}
