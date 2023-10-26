import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_ARTICLES_LIST } from '../../Server'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import { Error } from '../Error/Error'
import { ArticlesItem } from '../ArticlesItem/ArticlesItem'

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
          return <ArticlesItem article={article} key={index} />
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
  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`
const CustomLink = styled(Link)`
  text-decoration: none;
`
const Title = styled.h1`
  color: rgb(15, 23, 42);
  position: relative;
  font-weight: 700;
  text-align: left;
  font-size: 28px;
  margin-bottom: 30px;
`
