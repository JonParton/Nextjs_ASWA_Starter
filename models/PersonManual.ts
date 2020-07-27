export interface PersonManualAPIReturn {
  numberOfRecords: number
  manuals: Manual[]
}

export interface Manual {
  id: string
  name: string
  description: string
  answerToTheMeaningOfLife: string
  AvatarURL: string
}
