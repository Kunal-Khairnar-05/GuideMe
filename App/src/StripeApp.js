import { View, Text } from 'react-native'
import React from 'react'
import StripeApp_1 from './StripeApp_1'
import { StripeProvider } from '@stripe/stripe-react-native';

export default function StripeApp() {
  return (
  <StripeProvider publishableKey='pk_test_51OzZKjSGbk9Yd6N1HOmsT28mkka0oVK6bO3upmeOtPQ2tIkuBGVaTdyfU1jlsYwaiDnK7BMGEfBCNfMPz1BPzXAE00tT3l0rAr'>

<StripeApp_1/>

  </StripeProvider>
  )
}