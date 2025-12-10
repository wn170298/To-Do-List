# Vercel Deployment Guide

## Prerequisites
- GitHub account with the repository pushed
- Vercel account (free at https://vercel.com)
- Supabase project with credentials ready

## Step-by-Step Deployment

### 1. Prepare Your GitHub Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Initial to-do list app setup"
git push origin main
```

### 2. Create a Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Click "Import Git Repository"
4. Select your "To-Do-List" repository
5. Click "Import"

### 3. Configure Environment Variables

On the "Configure Project" screen:

1. Scroll to "Environment Variables"
2. Add two variables:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
     **Value**: Your Supabase project URL (from Settings > API)
   
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     **Value**: Your Supabase anon key (from Settings > API)

3. Click "Deploy"

### 4. Wait for Deployment

Vercel will:
- Build your Next.js app
- Run tests (if configured)
- Deploy to their global CDN
- Provide you with a live URL

### 5. Access Your App

Once deployed, you'll get a URL like:
```
https://todo-list-app-xyz.vercel.app
```

Click the link to visit your live to-do list app!

## Continuous Deployment

After initial deployment, every time you push to `main`:
1. Vercel automatically builds and deploys
2. You can see deployment status at vercel.com
3. Rollback is available if needed

## Production Checklist

Before using in production:

- [ ] Test all CRUD operations on live site
- [ ] Verify real-time updates work
- [ ] Check mobile responsiveness
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up custom domain (optional)
- [ ] Configure Supabase production settings
- [ ] Implement user authentication
- [ ] Update RLS policies for security

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Point your domain registrar to Vercel

## Monitoring and Logs

View deployment logs in Vercel:
1. Go to your project dashboard
2. Click "Deployments"
3. Select a deployment to see build logs
4. Click "Function Logs" for runtime errors

## Environment Variables in Production

To update environment variables:
1. Go to project Settings > Environment Variables
2. Edit or add variables
3. Trigger a new deployment (push to main, or redeploy)

## Troubleshooting

### App shows blank page
- Check browser console for errors
- Verify environment variables are set correctly
- Check Vercel function logs

### Database connection fails
- Verify Supabase project is active
- Check credentials are correct
- Ensure RLS policies allow public access

### Slow performance
- Check Vercel analytics
- Optimize images and assets
- Consider caching strategies

## Performance Tips

1. **Enable Vercel Analytics**:
   - Go to Settings > Analytics
   - Enable Web Analytics

2. **Set up Caching**:
   - Add cache headers to responses
   - Use Vercel's Edge Cache

3. **Monitor Database**:
   - Check Supabase database performance
   - Monitor connections and queries

## Scaling

As your app grows:
1. Monitor Vercel bandwidth usage
2. Consider database optimization
3. Implement pagination for large todo lists
4. Add user authentication for better data management

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
