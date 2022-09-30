import { Questionnaire, DifficultyLevel } from '@prisma/client';
export default [
	{
		"id" : 10,
		"difficultyLevel": DifficultyLevel.EASY
	},
	{
		"id" : 11,
		"difficultyLevel": DifficultyLevel.HARD
	},
	{
		"id" : 12,
		"difficultyLevel": DifficultyLevel.EXTREME
	}
] as Array<Questionnaire>
