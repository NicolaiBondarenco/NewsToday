import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ARTICLES_LIST } from '../../Server'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import { Error } from '../Error/Error'

const ArticlesList = () => {
  const [skip, setSkip] = useState(0)
  const [articles, setArticles] = useState([])
  const take = 10

  const [loading, setLoading] = useState(true)

  const [getGraphQlData, { loading: queryLoading, error }] = useLazyQuery(
    GET_ARTICLES_LIST,
    {
      variables: { skip, take },
      onCompleted: (newData) => {
        if (newData && newData.contents) {
          setLoading(false)
          setArticles((prevArticles) => [...prevArticles, ...newData.contents])
        }
      },
    },
  )

  useEffect(() => {
    getGraphQlData()
  }, [getGraphQlData])

  const handleScroll = () => {
    if (
      window.innerHeight + (document.documentElement.scrollTop + 1) >=
      document.documentElement.offsetHeight
    ) {
      setLoading(true)
      setSkip((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (loading) {
      getGraphQlData()
    }
  }, [loading, getGraphQlData])

  if (queryLoading && skip === 0) return <Loader />
  if (error) return <Error />

  const truncateDescription = (description) => {
    if (description.length > 150) {
      return description.slice(0, 150) + '...'
    }
    return description
  }

  const getRussianNoun = (number, cases) => {
    const rem100 = number % 100
    const rem10 = number % 10
    if (rem100 >= 11 && rem100 <= 19) {
      return cases[2]
    }
    if (rem10 === 1) {
      return cases[0]
    }
    if (rem10 >= 2 && rem10 <= 4) {
      return cases[1]
    }
    return cases[2]
  }
  const calculateTime = (time) => {
    const currentTimestamp = new Date().getTime()
    const timestamp = time * 1000
    const elapsedMilliseconds = currentTimestamp - timestamp

    const minutes = Math.floor(elapsedMilliseconds / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) {
      return 'только что'
    } else if (minutes < 60) {
      return `${minutes} ${getRussianNoun(minutes, [
        'минуту',
        'минуты',
        'минут',
      ])} назад`
    } else if (hours < 24) {
      return `${hours} ${getRussianNoun(hours, ['час', 'часа', 'часов'])} назад`
    } else {
      return `${days} ${getRussianNoun(days, ['день', 'дня', 'дней'])} назад`
    }
  }
  return (
    <div>
      <LogoWrapper>
        <CustomLink to={'/'}>
          <LogoImage
            src="https://point.md/static/svg/new-point-logo.svg"
            alt="Image-logo"
          />
        </CustomLink>
        <LogoText>Думай и решай свободно</LogoText>
      </LogoWrapper>
      <Wrapper>
        <Title>Сегодня</Title>
        {articles.map((article, index) => {
          const {
            id,
            title,
            description,
            thumbnail,
            url,
            dates,
            parents,
          } = article
          return (
            <WievItem key={index} id={id}>
              <CustomLink to={`/detailsNews/${id}`} state={{ id, url }}>
                <Image
                  src={`https://i.simpalsmedia.com/point.md/news/370x194/${thumbnail}`}
                  alt={description.intro}
                />
              </CustomLink>
              <div>
                <CustomLink to={`/detailsNews/${id}`} state={{ id, url }}>
                  <TitleNews>{title.short}</TitleNews>
                </CustomLink>
                <Description>
                  {truncateDescription(description.intro)}
                </Description>
                <SourceTimeWrapper>
                  {parents[1].attachment && (
                    <ImageSource
                      src={`https://i.simpalsmedia.com/point.md/logo/${parents[1].attachment}`}
                      alt={parents[1].id}
                    />
                  )}
                  <TimeOfCreation>{calculateTime(dates.posted)}</TimeOfCreation>
                </SourceTimeWrapper>
              </div>
            </WievItem>
          )
        })}
      </Wrapper>
    </div>
  )
}
export default ArticlesList

const LogoImage = styled.img`
  width: 170px;
  height: 48px;
`
const LogoText = styled.p`
  color: rgb(128, 128, 128);
  font-size: 12.1px;
  margin-right: 25px;
`
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
`
const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 25px 20px;
`
const SourceTimeWrapper = styled.div`
  margin: 0px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
`
const WievItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`
const CustomLink = styled(Link)`
  text-decoration: none;
`
const Image = styled.img`
  margin-right: 20px;
  width: 240px;
  border-radius: 4px;
`
const ImageSource = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  margin-right: 8px;
`
const Title = styled.h1`
  color: rgb(15, 23, 42);
  position: relative;
  font-weight: 700;
  text-align: left;
  font-size: 28px;
  margin-bottom: 30px;
`
const TitleNews = styled.h3`
  font-size: 24px;
  line-height: 26px;
  position: relative;
  color: rgb(15, 23, 42);
  letter-spacing: 0px;
  margin: -2.5px 0px 8px;
  font-weight: 500;
  &:hover {
    color: tomato;
  }
`
const Description = styled.p`
  line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  margin: 0px 0px 10px;
  color: rgb(15, 23, 42);
`
const TimeOfCreation = styled.p`
  font-size: 14px;
  color: rgb(128, 128, 128);
  line-height: 0;
  width: max-content;
`
