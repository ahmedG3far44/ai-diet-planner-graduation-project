import { Router } from 'express';

const router = Router();

router.get('/auth', (req, res) => {
  res.send('Auth Route');
});

export default router;
