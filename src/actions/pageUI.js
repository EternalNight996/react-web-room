import { dispatchAction} from './common.js'
import {
  SHIFT_LANGUAGE, SHIFT_THEME, SAVE_USER_CONFIGS
 } from '../constants/pageUI.js'

export const shiftLanguage = async () => {
  await dispatchAction(SHIFT_LANGUAGE)()
}
export const shiftTheme = async () => {
  await dispatchAction(SHIFT_THEME)()
}
export const saveUserConfigs = async () => {
  await dispatchAction(SAVE_USER_CONFIGS)()
}

