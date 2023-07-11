import './config/setEnv'
import './config/dbConnection'
import main from './app'

main.listen(
  main.get('port'),
  () => console.log(`Listen server on port ${main.get('port') as string}`)
)
