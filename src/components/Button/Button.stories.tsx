import { Story, Meta } from '@storybook/react'
import Button, { ButtonProps } from './Button'

export default {
  title: 'Components/Button',
  component: Button
} as Meta

const Template: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
  variant: 'contained'
}
