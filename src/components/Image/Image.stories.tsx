import { Story, Meta } from '@storybook/react'
import Image, { ImageProps } from './Image'

export default {
  title: 'Components/Image',
  component: Image
} as Meta

const Template: Story<ImageProps> = (args) => {
  return <Image {...args} />
}

export const Default = Template.bind({})
Default.args = {
  src: 'https://source.unsplash.com/mEZ3PoFGs_k/600x600',
  alt: ''
}
