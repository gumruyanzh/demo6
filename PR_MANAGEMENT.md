# Pull Request Management Tool

This repository includes an automated tool for checking and merging pull requests.

## Features

- ✅ Automatically checks all open pull requests
- 🔍 Detects merge conflicts
- 🚀 Merges clean PRs automatically
- 📊 Provides detailed status reports
- 🧪 Supports dry-run mode for testing

## Prerequisites

- [GitHub CLI (gh)](https://cli.github.com/) installed and authenticated
- Bash shell environment

**Note:** This script uses GitHub CLI's built-in `--jq` flag for JSON processing, so no external `jq` installation is required.

### Installing Prerequisites

**GitHub CLI:**
```bash
# macOS
brew install gh

# Linux
sudo apt install gh

# Windows
winget install GitHub.cli
```

Once installed, authenticate with:
```bash
gh auth login
```

## Usage

### Basic Usage

To check and merge all clean pull requests:

```bash
./check-and-merge-prs.sh
```

### Dry Run Mode

To check PRs without actually merging (recommended for testing):

```bash
./check-and-merge-prs.sh --dry-run
```

## What the Script Does

1. **Fetches all open pull requests** from the repository
2. **Checks each PR** for:
   - Merge conflicts
   - Mergeable status
   - Merge state (CLEAN, BLOCKED, BEHIND, etc.)
3. **Automatically merges** PRs that are:
   - Mergeable
   - Have CLEAN merge state
   - Have no conflicts
4. **Reports** PRs that need manual intervention:
   - PRs with conflicts
   - PRs that are blocked by review requirements
   - PRs that are behind the base branch

## Output Examples

### Clean PR (will be merged)
```
PR #10: Add new feature
  Mergeable: MERGEABLE
  State: CLEAN
  ✓ Ready to merge
  🔄 Merging PR #10...
  ✓ Successfully merged PR #10
```

### PR with Conflicts
```
PR #11: Update configuration
  Mergeable: CONFLICTING
  State: DIRTY
  ✗ Has conflicts - manual resolution required
```

### Blocked PR
```
PR #12: Security update
  Mergeable: MERGEABLE
  State: BLOCKED
  ⚠ Blocked - check required reviews or status checks
```

## Best Practices

1. **Always run in dry-run mode first** to preview what will happen
2. **Review the PRs** before running the automated merge
3. **Ensure CI/CD checks pass** before merging (the script respects blocking conditions)
4. **Monitor the output** for any PRs requiring manual intervention
5. **Handle conflicts manually** - the script will skip conflicting PRs

## Safety Features

- **Non-destructive**: Only merges PRs that are explicitly marked as CLEAN and MERGEABLE
- **Dry-run mode**: Test before executing
- **Detailed logging**: Shows exactly what's happening with each PR
- **Error handling**: Fails gracefully if GitHub CLI is not installed or authenticated

## Troubleshooting

### "gh: command not found"
Install the GitHub CLI from [cli.github.com](https://cli.github.com/)

### Authentication errors
Run `gh auth login` to authenticate with GitHub

### Permission denied
Make sure the script is executable: `chmod +x check-and-merge-prs.sh`

### "UNKNOWN" merge status
If PRs show UNKNOWN status, GitHub may still be calculating the merge status after recent changes. Wait a moment and run the script again.

## Integration with CI/CD

This script can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
name: Auto-merge PRs
on:
  schedule:
    - cron: '0 */6 * * *'  # Run every 6 hours
  workflow_dispatch:  # Manual trigger

jobs:
  merge-prs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Merge clean PRs
        run: ./check-and-merge-prs.sh
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Contributing

When adding new features to the PR management tool:
1. Test in dry-run mode first
2. Update this documentation
3. Ensure backward compatibility
4. Add appropriate error handling

## License

This tool is part of the demo6 project and follows the same license terms.
