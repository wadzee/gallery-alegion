import { Story, Meta } from '@storybook/react'
import Spinner, { SpinnerProps } from './Spinner'

export default {
  title: 'Components/Spinner',
  component: Spinner
  // decorators: [
  //   (Story) => (
  //     <div style={{ width: 500, height: 500 }}>
  //       <Story />
  //     </div>
  //   )
  // ]
} as Meta

const Template: Story<SpinnerProps> = (args) => {
  return <Spinner {...args} />
}

export const Default = Template.bind({})
Default.args = {
  variant: 'circle'
}
