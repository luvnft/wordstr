import {useApollo} from '@/api/apolloConfig'
import '@/styles/index.css'
import {ApolloProvider} from '@apollo/client'
import {DefaultSeo} from 'next-seo'
import Error from 'next/error'
import PropTypes from 'prop-types'

export default function App({Component, pageProps}) {
  /**
   * Wrap the app in the ApolloProvider component.
   *
   * @see https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
   */
  const apolloClient = useApollo(pageProps)

  // Check for errors.
  const error = pageProps?.error
  let errorMessage = pageProps?.errorMessage ?? 'An unknown error occurred.'
  // Trim trailing period - added via Error component.
  errorMessage = errorMessage.replace(/\.$/g, '')

  return (
    <ApolloProvider client={apolloClient}>
      {error ? (
        <Error statusCode={500} title={errorMessage} />
      ) : (
        <>
          <DefaultSeo
            title="Next.js WordPress Starter"
            description="Query from Yoast SEO"
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: 'Query from Yoast SEO',
              site_name: '',
              images: [
                {
                  url: 'Query from Yoast SEO',
                  width: 'Query from Yoast SEO',
                  height: 'Query from Yoast SEO',
                  alt: 'Query from Yoast SEO'
                }
              ]
            }}
          />
          <Component {...pageProps} />
        </>
      )}
    </ApolloProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired
}
