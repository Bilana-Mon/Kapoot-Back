import { Questionnaire, DifficultyLevel } from '@prisma/client';
export default [
	{
		"id" : 10,
		"difficultyLevel": DifficultyLevel.EASY,
		timeout: 300000
	},
	{
		"id" : 11,
		"difficultyLevel": DifficultyLevel.HARD,
		timeout: 300000
	},
	{
		"id" : 12,
		"difficultyLevel": DifficultyLevel.EXTREME,
		timeout: 300000
	}
] as Array<Questionnaire>
