import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { logger } from '../utils';

// Define the rate limit configuration
const rateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true, // Include rate limit info in response headers
    handler: (req: Request, res: Response, next: NextFunction) => {
        // Log rate limiting events
        logger.warn(`Rate limit exceeded for IP: ${req.ip}. Request path: ${req.path}.`);
        res.status(429).send('Too many requests, please try again later.');
    },
};

// Create the rate limiter middleware
export const Limiter = rateLimit(rateLimitConfig);
