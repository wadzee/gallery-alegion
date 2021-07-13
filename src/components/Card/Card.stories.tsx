import { Story, Meta } from '@storybook/react'
import Card, { CardProps } from './Card'

export default {
  title: 'Components/Card',
  component: Card
} as Meta

const Template: Story<CardProps> = (args) => {
  return (
    <Card {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Card>
  )
}

export const Default = Template.bind({})
Default.args = {
  padding: 'sm'
}

export const Medium = Template.bind({})
Medium.args = {
  padding: 'md'
}

export const Large = Template.bind({})
Large.args = {
  padding: 'lg'
}
