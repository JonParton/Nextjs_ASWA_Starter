import React from 'react'
import { IconProps } from './Icons'

type SmallCardProps = {
  Icon: React.FunctionComponent<IconProps>
  title: string
  slug: string
}

export const SmallCard: React.FunctionComponent<SmallCardProps> = ({
  Icon,
  title,
  slug,
}) => {
  return (
    <a className="card-small" href={`/DeployableFramework/${slug}`}>
      <Icon w={153} h={163} />
      <h3>{title}</h3>
    </a>
  )
}

export default SmallCard
