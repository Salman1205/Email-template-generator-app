import React from 'react'

const TemplateContainer = ({htmlContent}) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}

export default TemplateContainer