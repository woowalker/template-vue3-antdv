import consts from './const'

function havePermisson (permission) {
  return consts['COMMON/AUTH_CODES'].indexOf(permission) > -1
}

export default havePermisson
