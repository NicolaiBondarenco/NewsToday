import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ArticlesItem = ({ article }) => {
  const { id, title, description, thumbnail, url, dates, parents } = article

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

  return (
    <ViewItem>
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
        <Description>{truncateDescription(description.intro)}</Description>
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
    </ViewItem>
  )
}

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
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
  }
`
const Description = styled.p`
  line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  margin: 0px 0px 10px;
  color: rgb(15, 23, 42);
  @media (max-width: 850px) {
    display: none;
  }
`
const TimeOfCreation = styled.p`
  font-size: 14px;
  color: rgb(128, 128, 128);
  line-height: 0;
  width: max-content;
`

const Image = styled.img`
  margin-right: 20px;
  width: 240px;
  border-radius: 4px;
  @media (max-width: 480px) {
    width: 144px;
    margin-right: 15px;
    height: max-content;
  }
`

const ImageSource = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  margin-right: 8px;
`
const SourceTimeWrapper = styled.div`
  margin: 0px;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
`
const ViewItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`
const CustomLink = styled(Link)`
  text-decoration: none;
`
