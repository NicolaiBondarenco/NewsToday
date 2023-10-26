import { useQuery } from '@apollo/client'
import { GET_ARTICLE } from '../../Server'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const FullNews = () => {
  const {
    state: { id, url },
  } = useLocation()
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id, url },
  })

  if (!data || !data.content) {
    return null
  }

  const {
    thumbnail,
    title,
    description,
    parents,
    dates,
    counters,
  } = data.content

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000)

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }

    return date.toLocaleDateString('ru-RU', options)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <Wrapper>
      <CustomLinkLogo to={'/'}>
        <LogoImage
          src="https://point.md/static/svg/new-point-logo.svg"
          alt="Image-logo"
        />
      </CustomLinkLogo>
      <WrapperContent>
        <FullTop>
          <SourceWrapper>
            {parents[1].attachment && (
              <SourceImage
                src={`https://i.simpalsmedia.com/point.md/logo/${parents[1].attachment}`}
                alt={parents[1].id}
              />
            )}
            <CustomLink to={`https://www.${parents[1].title.nu}/`}>
              {parents[1].title.nu.split('.')[0].slice(0, 8)}
            </CustomLink>
          </SourceWrapper>
          <TimeCreatingPost>{formatTimestamp(dates.posted)}</TimeCreatingPost>
          <CounterWrapper>
            <Counter>{counters.view}</Counter>
          </CounterWrapper>
        </FullTop>
        <Title>{title.short}</Title>
        <Descroption>{description.intro}</Descroption>
        <Image
          src={`https://i.simpalsmedia.com/point.md/news/600x315/${thumbnail}`}
          alt="Full-photo"
        />
        <ShortDescroption>{description.thumbnail}</ShortDescroption>
        <AdditionalContent
          dangerouslySetInnerHTML={{ __html: description.long }}
        />
      </WrapperContent>
    </Wrapper>
  )
}

export default FullNews

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const WrapperContent = styled.div`
  max-width: 900px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  @media (max-width: 480px) {
    padding: 5px;
  }
`
const LogoImage = styled.img`
  width: 170px;
  height: 48px;
`
const SourceWrapper = styled.div`
  display: flex;
  align-items: center;
`
const CounterWrapper = styled.div`
  display: flex;
  padding-left: 22px;
  position: relative;
  margin-left: 16px;
  &:before {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0px;
    left: 0px;
    content: '';
    background: url('https://point.md/static/svg/new-icons/eye.svg') center top /
      contain no-repeat;
  }
  @media (max-width: 480px) {
    &:before {
      top: -2px;
    }
  }
`
const Counter = styled.span`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  white-space: nowrap;
  color: rgb(128, 128, 128);
  font-weight: 400;
  font-size: 16px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`
const SourceImage = styled.img`
  height: 16px;
  border-radius: 2px;
`
const FullTop = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h1`
  color: rgb(15, 23, 42);
  font-size: 40px;
  letter-spacing: -1px;
  line-height: 44px;
  font-weight: 700;
  margin: 12px 0px 0px;
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 34px;
    margin-top: 12px;
  }
`
const Descroption = styled.h2`
  color: rgb(15, 23, 42);
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0px;
  margin-top: 16px;
  margin-bottom: 24px;
  line-height: 28px;
  @media (max-width: 480px) {
    font-size: 18px;
    line-height: 24px;
  }
`
const ShortDescroption = styled.figcaption`
  width: 100%;
  color: rgb(128, 128, 128);
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 16px;
  padding-top: 8px;
  word-break: break-word;
  margin-bottom: 24px;
`
const AdditionalContent = styled.div`
  p {
    margin: 0px 0px 15px;
    color: rgb(15, 23, 42);
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0px;
    line-height: 27px;
    img {
      max-width: 100%;
    }
    a {
      color: rgb(51, 121, 191);
    }
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 418px;
  object-fit: cover;
  border-radius: 8px;
`
const TimeCreatingPost = styled.div`
  color: rgb(128, 128, 128);
  font-size: 16px;
  line-height: 0;
  white-space: nowrap;
  letter-spacing: 0px;
  margin-left: 16px;
  text-transform: lowercase;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`
const CustomLink = styled(Link)`
  text-decoration: none;
  color: rgb(51, 121, 191);
  font-size: 16px;
  font-weight: 400;
  margin-left: 8px;
  white-space: nowrap;
  padding: 15px;
  &:hover {
    color: tomato;
  }
  @media (max-width: 480px) {
    margin-left: 2px;
    padding: 0;
  }
`
const CustomLinkLogo = styled(Link)`
  text-decoration: none;
  color: rgb(51, 121, 191);
  font-size: 16px;
  font-weight: 400;
  margin-left: 8px;
  white-space: nowrap;
  padding: 15px;
`
